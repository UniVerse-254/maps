import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { RefreshCw, Home } from "lucide-react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RouteErrorBoundary() {
  const error = useRouteError();

  console.error("Uncaught route error:", error);

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "Something went wrong under the hood.";

  const handleReload = () => window.location.reload();
  const handleGoHome = () => (window.location.href = "/");

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-base bg-texture px-4 text-content">
      <div className="max-w-md w-full rounded-3xl border border-line bg-panel p-8 shadow-xl text-center flex flex-col items-center">
        <div className="h-44 w-44 -mb-2">
          <DotLottieReact src="/animations/bored.lottie" loop autoplay />
        </div>

        <h1 className="font-display text-xl font-bold tracking-tight mt-2">
          Unexpected Application Error
        </h1>

        <p className="mt-2 text-[14px] text-content-muted leading-relaxed">
          Well, this is awkward. Something went wrong under the hood. Take a
          breath and let's reload.
        </p>

        {import.meta.env.DEV && (
          <p className="mt-2 text-[12px] font-mono text-content-muted/70 break-all">
            {message}
          </p>
        )}

        <div className="mt-6 flex w-full flex-col gap-2.5 sm:flex-row">
          <button
            onClick={handleReload}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-route py-3 text-[14px] font-bold text-white shadow-md shadow-route/20 hover:bg-route/90 transition-all active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
            Reload Page
          </button>

          <button
            onClick={handleGoHome}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-panel py-3 text-[14px] font-bold text-content hover:bg-line/40 transition-all active:scale-95"
          >
            <Home className="h-4 w-4" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
