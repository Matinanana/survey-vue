module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? '' : 'http://192.168.13.233:80',
	isDevEnv: process.env.NODE_ENV === 'development' ? true : false
};
