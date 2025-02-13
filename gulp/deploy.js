'use strict';

import path from 'path';
import del from 'del';

const deploy = ({
  gulp,
  config,
  plugins
}) => {
  const dir = config.directory;

  // deploy
  gulp.task('deploy', () => {
    return gulp.src(path.join(dir.production, '**/*'))
      // fix the "dir.production" folder being published into gh-pages banch
      .pipe(plugins.rename(file => {
        let pathPartList = file.dirname.split(path.sep);
        if (pathPartList[0] === dir.production) {
          pathPartList.shift();
          file.dirname = pathPartList.join(path.sep);
        }
      }))
      .pipe(plugins.ghPages());
  });
};

export default deploy;
