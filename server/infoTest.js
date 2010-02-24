// ------------------------------------------------------
	var log = require('./log');
	log.level = log.DEBUG;

// ------------------------------------------------------

	log.info('global: ' + global);
	log.info('module: ' + module);
	log.info('process: ' + process);
	log.info('require.paths: ' + require.paths);
	log.info('__filename: ' + __filename);
	log.info('__dirname: ' + __dirname);
	
