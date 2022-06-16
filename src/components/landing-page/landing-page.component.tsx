import { ErrorBoundary } from '../errors/error-boundary.component';
import { Header } from '../shared/header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTER_PATHS } from '../../routes';
import { LandingContent } from './landing-page-content';
import 'twin.macro';

export const LandingPage = (): JSX.Element => {
  return (
    <div tw="h-screen flex flex-col">
      <div>
        <Header />
      </div>
      <div tw="flex flex-1">
        <div tw="w-[250px] bg-[#242528]"></div>
        <div tw="flex-1 bg-[#242528] px-[30px] pt-[30px]">
          <div>
            <Routes>
              <Route
                path={ROUTER_PATHS.LANDING_PAGE}
                element={
                  <ErrorBoundary>
                    <div>
                      <LandingContent />
                    </div>
                  </ErrorBoundary>
                }
              />
              <Route
                path=""
                element={<Navigate to={ROUTER_PATHS.LANDING_PAGE} replace />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
