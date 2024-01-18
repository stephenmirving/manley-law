imagemin *.png --plugin.pngquant.speed=1 --out-dir=png-quant

imagemin *.jpg --plugin.jpegoptim.max=30 --out-dir=jpegoptim

imagemin logo*.png --plugin.webp.preset=text --plugin.webp.quality=60 --plugin.webp.method=6 --out-dir=logos-webp-q60

imagemin bridge*.png --plugin.webp.preset=photo --plugin.webp.quality=60 --plugin.webp.method=6 --out-dir=bridge-sunset-webp-from-png

imagemin bridge*.jpg --plugin.webp.preset=photo --plugin.webp.quality=60 --plugin.webp.method=6 --out-dir=bridge-sunset-webp-from-jpg

imagemin bridge*.webp --plugin.webp.preset=photo --plugin.webp.quality=60 --plugin.webp.method=6 --out-dir=bridge-sunset-webp-from-original-webp

imagemin skyscrapers*.png --plugin.webp.preset=photo --plugin.webp.quality=50 --plugin.webp.method=6 --out-dir=skyscrapers-webp-from-png

imagemin skyscrapers*.jpg --plugin.webp.preset=photo --plugin.webp.quality=50 --plugin.webp.method=6 --out-dir=skyscrapers-webp-from-jpg

imagemin skyscrapers*.webp --plugin.webp.preset=photo --plugin.webp.quality=50 --plugin.webp.method=6 --out-dir=skyscrapers-webp-from-original-webp

imagemin *q100.jpg --plugin.jpegoptim.max=30 --out-dir=jpg-optim-from-jpg

imagemin *q100.jpg --plugin=jpegtran --out-dir=jpg-tran-from-jpg

imagemin *icon*.png --plugin.pngquant.speed=1 --out-dir=icons-quant
