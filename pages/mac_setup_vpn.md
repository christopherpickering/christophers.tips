# How To Use VPN on an Intranet

Why use a VPN? The VPN will keep your network traffic secure between you and the host and will make snooping very challenging. The downside of a VPN is that all traffic from your computer is routed to the VPN host and you loose access to servers/websites that are on the local network.

These steps will help to make a VPN doable

## Installs
* [ProtonVPN](https://protonvpn.com)
* [Helm](https://apps.apple.com/us/app/helm-hosts-file-manager/id1099472017?mt=12) or another hosts manager

## How To

Running intranet sites while on a VPN can be painful, but with a few steps can be conquered.

First install ProtonVPN and Helm.

ProtonVPN is the VPN of our choice.

Helm is used to easly manage hosts. We can have several profiles in there.

### Create Network Routes

When you are running a VPN all network traffic is routed out to the VPN host. This means that you will not be able to access intranet sites anymore, or any sites that are specific to the network you are using.

Thankfully your mac has an option to router network traffic to specific hosts and bypass the VPN if needed!

A network route can be easily added. Heres an example that will reroute all 10.x.x.x traffic through 11.0.0.1:

```sh
sudo -n add route -net 10.0.0.0 11.0.0.1
```

The problem is that when your mac restarts it will reset the routes!

We need to make a script that will add the routes each time your mac restarts.

#### Create Route Script

In your favorite script location make a new script.

```sh
cd fav_script_location
nano route_script
```

Add in the routes to add. You can find all the route syntax options by running ```man route```.

the basic syntax is

```sh
add route ip_address gateway_address
```

I include the -n so network names are not looked up when adding the route, and also -net which will allow a base address to include matches. For example -net 10.0.0.0 will include 10.1.0.0. The last three zeros are basically wild cards in the ip addresses.

To find the local gateway run ```netstat -rn``` with the VPN off. The default destination will have a gateway IP address for you LAN.

When completed your script may look like this:

```sh
route -n add -net 10.0.0.0 10.1.123.1
route -n add -net 10.1.233.1 10.1.123.1
```

Change permissions for script.

```sh
chmod +x route_script
```

#### Add plist To Run Script on Startup

The plist needs to be in ``` ~/Library/LaunchAgents``` to be pickedup.

```sh
nano ~/Library/LaunchAgents/com.route_script.plist
```

Add in the content.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.route_script.plist</string>
    <key>ProgramArguments</key>
    <array>
        <string>fav_script_location/route_script</string>
    </array>
    <key>StandardErrorPath</key>
    <string>fav_script_location/route_script.err</string>
    <key>StandardOutPath</key>
    <string>fav_script_location/route_script.out</string>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
```

Set the script to launch on startup.

```sh
sudo chown root ~/Library/LaunchAgents/com.route_script.plist
sudo launchctl load ~/Library/LaunchAgents/com.route_script.plist
```

To test if the route are working you can manually start the plist, or restart your mac and run ```netstat -rn```. Your new rout should be listed in there!

To manually launch plist:

```sh
sudo launchctl start com.route_script.plist
```

If it does not start, open mac app "console" and check for any messages in the system.log section. You will find details of the errors in the paths specified for logging in the plist paths you created for logging.

### Setup Hosts

Finally, the last step is to configure Helm with your hosts. Click the icon in the menu bar and follow instructions.

## Test

Turn on the VPN and try to access the local sites! 