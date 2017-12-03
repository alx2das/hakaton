export default (api) => {

    api.addResource('api', 'apii');

    api.api().addResource('stories', 'GetStories');
    api.api().addResource('statistics', 'GetStatistics');
    api.api().addResource('challenges', 'GetChallanges');
    api.api().addResource('challenge', 'Challange');
    api.api().addResource('statistics_black', 'TopWeekBlackCashiers');

};
