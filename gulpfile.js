var gulp   = require('gulp');
var RevAll = require('gulp-rev-all');
var fs     = require('fs');

var baseDir = 'StaticFileVersionExample';
var contentDir = baseDir+'/Content';

gulp.task('gulp-rev-all', function(){
    var revAll = new RevAll({fileNameManifest: 'server-manifest.json'});
    var baseDir = 'StaticFileVersionExample'
    return gulp.src([
        contentDir+'/**/*.css',
        contentDir+'/**/*.js',
        contentDir+'/**/*.{jpg,gif,png,bmp}'
        ], {base: contentDir}
    ).pipe(revAll.revision())
    .pipe(gulp.dest(baseDir+'/Public'))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(contentDir));
});

gulp.task('format-manifest', ['gulp-rev-all'], function(){
  var manifest, manifestData, keyArray, key, item, serverManifest;
  manifest = fs.readFileSync(contentDir + "/server-manifest.json");
  if (manifest.length) {
    manifestData = JSON.parse(manifest);
  }
  keyArray = [];
  for (key in manifestData) {
    item = manifestData[key];
    keyArray.push(key);
  }
  keyArray.sort(function(a, b){
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  serverManifest = {};
  for (var i=0, j=keyArray.length; i<j; i++) {
    key = keyArray[i];
    serverManifest[key] = manifestData[key];
  }
  serverManifest = JSON.stringify(serverManifest, null, 2);
  return fs.writeFileSync(contentDir + "/server-manifest.json", serverManifest);
});

gulp.task('default', ['format-manifest'], function() {
    console.log('文件版本添加完成');
});
