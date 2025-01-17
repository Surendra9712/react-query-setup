import {BrowserRouter} from "react-router";
import {lazy, Suspense} from "react";
import AppWrapper from "./components/AppWrapper.tsx";

const AppRoutes = lazy(() => import('./routes/AppRoutes.tsx'))

function App() {
    return (
        <BrowserRouter>
            <AppWrapper>
                <Suspense fallback={<div>Loading...</div>}>
                    <AppRoutes/>
                </Suspense>
            </AppWrapper>

        </BrowserRouter>
    )
}

export default App
