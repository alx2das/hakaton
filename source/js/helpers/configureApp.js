export const getRoutesSections = (routesObj) => {
    return Object.keys(routesObj).reduce((prev, key) => {
        const route = routesObj[key];
        route.name = key;
        if (route.nested)
            route.nested = getRoutesSections(route.nested);

        return [...prev, route];
    }, []);
};

export const getRoutes = (modules) => {
    return modules.filter(m => m.routes).reduce((routes, module) => {
        const routesObj = module.routes;
        const routesArr = getRoutesSections(routesObj);

        return [...routes, ...routesArr];
    }, []);
};

export const getStores = (modules) => {
    return modules.filter(m => m.stores).reduce((stores, module) => {
        const moduleStores = module.stores;
        return {...stores, ...moduleStores};
    }, {});
};

export const getServerData = (modules, request) => {
    const routeObj = getRoutes(modules)
        .filter(m => m.path === request.params[0]);

    return routeObj && routeObj[0] && routeObj[0].serverData || null;
};