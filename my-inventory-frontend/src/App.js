import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {CreateJob} from './views/components/create-job';
import { InventoryDashboard } from './table-form/components/dashboard';
import { DataGrip } from './views/components/data-grip';
import { CategoryList } from './views/components/category-list';
import { routerPaths } from './cons/cons';
import { ErrorPage } from './table-form/errors/page-error';

const router = createBrowserRouter([
    {
        path: '/*',
        element: <ErrorPage/>, // Set the custom error component
    },
    {path: routerPaths.default, element: <CreateJob/>},
    {
        path: routerPaths.inventoryDashboard,
        element: <InventoryDashboard/>,
        children: [
            {
                index: 1,
                element: <DataGrip/>,
            },
            {
                path: routerPaths.categoryList,

                element: <CategoryList/>,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
