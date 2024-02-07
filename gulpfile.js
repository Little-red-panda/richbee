const gulp = require("gulp");

const htmlclean = require("gulp-htmlclean");
const fileInclude = require("gulp-file-include");

const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");

const imagemin = require("gulp-imagemin");

const jsmin = require("gulp-jsmin");
const babel = require("gulp-babel");

const changed = require("gulp-changed");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sourceMaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const fs = require("fs");
const server = require("gulp-server-livereload");

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: "Error <%= error.message %>",
      sound: false,
    }),
  };
};

const fileIncludeSetting = {
  prefix: "@@",
  basepath: "@file",
};

gulp.task("clean", function (done) {
  if (fs.existsSync("./docs/")) {
    return gulp.src("./docs/", { read: false }).pipe(clean({ force: true }));
  }
  done();
});

gulp.task("html", function () {
  return gulp
    .src("./src/**/*.html")
    .pipe(changed("./docs/"))
    .pipe(plumber(plumberNotify("HTML")))
    .pipe(fileInclude(fileIncludeSetting))
    .pipe(htmlclean())
    .pipe(gulp.dest("./docs/"));
});

gulp.task("sass", function () {
  return gulp
    .src("./src/scss/index.scss")
    .pipe(changed("./docs/css/"))
    .pipe(plumber(plumberNotify("SCSS")))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./docs/css/"));
});

gulp.task("images", function () {
  return gulp
    .src("./src/img/**/*")
    .pipe(changed("./docs/img/"))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./docs/img/"));
});

gulp.task("js", function () {
  return gulp
    .src("./src/js/*.js")
    .pipe(changed("./docs/js/"))
    .pipe(plumber(plumberNotify("JS")))
    .pipe(babel())
    .pipe(jsmin())
    .pipe(gulp.dest("./docs/js/"));
});

gulp.task("fonts", function () {
  return gulp.src("./src/fonts/*").pipe(gulp.dest("./docs/fonts"));
});

gulp.task("watch", function () {
  gulp.watch("./src/**/*.html", gulp.parallel("html"));
  gulp.watch("./src/sass/**/*.scss", gulp.parallel("sass"));
  gulp.watch("./src/img/**/*", gulp.parallel("images"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("js"));
});

const serverOptions = {
  livereload: true,
  open: true,
};

gulp.task("server", function () {
  return gulp.src("./docs/").pipe(server(serverOptions));
});

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("html", "sass", "images", "js", "fonts"),
    gulp.parallel("server", "watch")
  )
);
