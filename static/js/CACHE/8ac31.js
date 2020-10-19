(function($){$(document).ready(function(e){$("body").on("click",".js-toolbar-action",function(event){event.preventDefault();var $img = $(".book");if(!$img.hasClass("with-summary")){$img.addClass("with-summary")}else{$img.removeClass("with-summary")}})});var $window = $(window),$img = $(".book");function resize(){if($window.width()>1200){return $img.addClass("with-summary")}$img.removeClass("with-summary")}$window.resize(resize).trigger("resize");$(document).ready(function($){$("#accordion") .find(".accordion-toggle") .click(function(){$(this) .next() .slideToggle("fast");$(".accordion-content") .not($(this).next()) .slideUp("fast")})})})(jQuery);(function($){$(document).ready(function(e){console.log("here") var $page_body = $('.page-inner').html();console.log($page_body) var a = 0;var array = [];var links = $('.chapter a');$(links).each(function(index){var url = $(this).attr('href');var title = $(this).text().trim();$.get($(this).attr('href'),function(data){array.push({'title':title,'url':url,'data':$(data).find('.page-inner').text().replace(/\s+/g," ")})}).done(function(data){a++;callback(a)})});function callback(a){};$('#search').keyup(function(){var searchField = $(this).val();if(searchField === ''){console.log($page_body);$('.page-inner').html(` <section class="normal markdown-section"><h1>Hi,I'm Christopher Pickering
                                </h1>
                                <p>
                                    I'm a believer in Jesus Christ and an engineer. I love my family,learning,building things,and solving hard problems. </p><h2>What I do </h2><p>I work for <a href="www.bimba.com">Bimba </a>during the day. Most of my time is spent creating solutions and simplifying tasks with python programming and doing data collection,reporting and analysis. </p><p>When other time is available I chip in at <a href="www.dayspringbibles.com">Dayspring Bibles </a>doing scripting,typesetting and other fun things. </p><h2>This Site </h2><p>This is a static html site built with markdown and compiled with python. You can learn how to make it <a href="/pages/make_this_site.html">here </a>. I've found that most of the time used on projects is spent finding a simple problem. The purpose of this site is to save the little solutions for next time :)
                                </p>
                                <p>
                                    <strong>
                                        Thanks for visiting.
                                    </strong>
                                </p>
                                <p style="border-top: solid rgba(0, 0, 0, .07) 1px;padding-top: 20px;">
                                    <span style="font-size: 90%;float: left; height:30px;">
                                        <small>
                                            Last updated November 9,2018
                                        </small>
                                    </span>
                                    <span class="footer-links">
                                        <a href="https:                                            <i class="fab fa-github" style="padding-right: 20px;">
                                            </i>
                                        </a>
                                        <a href="https:                                            <i class="fab fa-code" style="padding-right: 20px;">
                                            </i>
                                        </a>
                                        <script type="text/javascript" id="emailscript">
                                            emailE = 'gmail.com';
                                            emailE = ('pher122s' + '@' + emailE);
                                            document.write('<a href="mailto:' + emailE + '"><i class="fas fa-envelope" style="padding-right: 20px;"></i></a>');
                                        </script>
                                       
                                        <noscript>
                                            <a href="#">
                                                <i class="fas fa-envelope" style="padding-right: 20px;">
                                                </i>
                                            </a>
                                        </noscript>
                                        <a href="https:                                            <i class="fab fa-linkedin">
                                            </i>
                                        </a>
                                    </span>
                                </p>
                            </section>`)
                    return;
                };
                
                var regex = new RegExp(searchField, "i");
                var output = '<div class="row">';
                var count = 1;
                  $.each(array, function(key, val){
                    if ((val.data.search(regex) != -1)) {
                                                output += '<div class="col-md-6 well">';
                          output += '<div class="col-md-3"></div>';
                          output += '<div class="col-md-7">';
                          output += '<h5>' + val.url + '</h5>';
                          output += '<h5>' + val.title + '</h5>';                  
                          output += '<p>' + val.data + '</p>';
                          output += '</div>';
                          output += '</div>';
                      if(count%2 == 0){
                        
                        output += '</div><div class="row">'
                      }
                      count++;
                    }
                  });
                    output += '</div>';
                  $('.page-inner').html(output)})})})(jQuery);