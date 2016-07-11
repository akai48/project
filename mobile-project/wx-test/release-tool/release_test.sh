#!/bin/bash
#压缩测试版的wx
find . -name ".DS_Store" | while read FILE;
do
    rm ${FILE}
done
cd ..
rm -rf ../copytempfile
rm -rf ../releasetempfile


mkdir ../copytempfile
cp -rf * ../copytempfile
cd ../copytempfile
filelist=$(ls *.html)
#echo $filelist
for file in $filelist
do
		echo $file
		startLine=`sed -n '/<!--压缩-b-->/=' $file`
		if [ ! -z $startLine ]&&[ $startLine -gt 0 ];then
#			echo $startLine
			endLine=`sed -n '/<!--压缩-e-->/=' $file`
#			echo $endLine
			sed -ig $startLine','$endLine'd' $file
			
			line=`sed -n '/<!--zepto.js-->/=' $file` 
#			echo $line
			if [ ! -z $line ];then
			sed -ig 's/<!--zepto.js-->/<script type="text\/javascript" src="js\/app\/zepto-app.js"><\/script>/g' $file
			else
			sed -ig 's/<!--jquery.js-->/<script type="text\/javascript" src="js\/app\/jquery-app.js"><\/script>/g' $file
			fi
		fi
		startLine=`sed -n '/<!--压缩css-b-->/=' $file`
		if [ ! -z $startLine ]&&[ $startLine -gt 0 ];then
#			echo $startLine
			endLine=`sed -n '/<!--压缩css-e-->/=' $file`
#			echo $endLine
			sed -ig $startLine','$endLine'd' $file
			
			line=`sed -n '/<!--common.css-->/=' $file` 
#			echo $line
			if [ ! -z $line ];then
			sed -ig 's/<!--common.css-->/<link rel="stylesheet" type="text\/css" href="css\/common\/common.css">/g' $file
			fi
		fi
		
done
rm -rf *.htmlg

mkdir ./js/lib
mkdir ./js/lib/zepto-app/
mkdir ./js/lib/jquery-app/

#jquery 压缩
cp -rf ../share-js/lib/jq/*.js ./js/lib/jquery-app/
cp -rf ../share-js/lib/vue/vue.min.js ./js/lib/jquery-app/
cp -rf ../share-js/lib/wx/*.js ./js/lib/jquery-app/
cp -rf ../share-js/common/*.js ./js/lib/jquery-app/
cp -rf ./js/public/*.js ./js/lib/jquery-app/
cp -f ./js/config/config-test.js ./js/lib/jquery-app/config.js
#zepto 压缩
cp -rf ../share-js/lib/zepto/*.js ./js/lib/zepto-app/
cp -rf ../share-js/lib/vue/vue.min.js ./js/lib/zepto-app/
cp -rf ../share-js/lib/wx/*.js ./js/lib/zepto-app/
cp -rf ../share-js/common/*.js ./js/lib/zepto-app/
cp -rf ./js/public/*.js ./js/lib/zepto-app/
cp -f ./js/config/config-test.js ./js/lib/zepto-app/config.js

mkdir ./css/temp/
cp -rf ../share-css/common/*.css ./css/temp/
cp -rf ./css/public/*.css ./css/temp/

rm -rf ../../mbfun_web_release
mkdir ../../mbfun_web_release
mkdir ../../mbfun_web_release/wx-test-test

fis3 release -d ../releasetempfile
#删除
rm -rf ./js/lib
rm -rf ./css/temp/

rm -rf ../copytempfile

cp ../fis3/fis-conf.js ../releasetempfile
cd ../releasetempfile
fis3 release -d ../../mbfun_web_release/wx-test-test
rm -rf ../releasetempfile
rm -rf ../../mbfun_web_release/wx-test-test/js/lib
rm -rf ../../mbfun_web_release/wx-test-test/js/common
rm -rf ../../mbfun_web_release/wx-test-test/js/config
rm -rf ../../mbfun_web_release/wx-test-test/js/public
rm -rf ../../mbfun_web_release/wx-test-test/css/temp
rm -rf ../../mbfun_web_release/wx-test-test/css/public

cd ../../mbfun_web_release/wx-test-test
filelist=$(ls *.html)
for file in $filelist
do
		echo $file
		sed -i "" 's/..\/..\/images/.\/images/g' $file
		sed -i "" 's/stylesheet\/less/ stylesheet/g' $file			
done
rm -rf *.htmlg