export default (api) => {

    api.addResource('api', 'apii');

    api.api().addResource('stories', 'GetStories');
    api.api().addResource('statistics', 'GetStatistics');

};
