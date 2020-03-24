const Mock = require('mockjs');

// 格式: Mock.mock(url, post/get, 返回的数据);
Mock.mock('/api/userInfo','get',require('./json/userInfo'));
Mock.mock('/api/loginInfo','post',require('./json/loginInfo'));
Mock.mock('/api/communicate','get',require('./json/communicate'));
Mock.mock('/api/swipers','get',require('./json/swipers'));
Mock.mock('api/role','get',require('./json/role'))
