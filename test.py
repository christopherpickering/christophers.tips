import hashlib
from csscompressor import compress
from pathlib import Path

files = Path(__file__).parents[0].joinpath("static").joinpath("css").joinpath("CACHE").iterdir()
print(files)
import glob
import os

#page.stat().st_mtime


latest_file = max(files, key=os.path.getctime)
print (latest_file)



