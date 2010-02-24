// ------------------------------------------------------
	var log = require('./log');
	log.level = log.DEBUG;

// ------------------------------------------------------

	log.info('global:');
	log.inspect(global);

	log.info('module:');
	log.inspect(module);

	log.info('process:');
	log.inspect(process);

	log.info('require.paths:');
	log.inspect(require.paths);

	log.info('__dirname:');
	log.inspect(__dirname);

	log.info('__filename:');
	log.inspect(__filename);