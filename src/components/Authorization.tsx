import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import fingerPrintFail from "../../public/animation/73435-fingerprint-fail.json";
import fingerPrintSuccess from "../../public/animation/73434-fingerprint-success.json";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const Authorization: FC<{ redirectPath: string; children: ReactNode }> = ({ redirectPath, children }): ReactNode => {
  const { data, status } = useSession();
  const router = useRouter();
  const [wait, setWait] = useState(false);

  useEffect(() => {
    if (wait) {
      const timeout = setTimeout(() => {
        router.replace(redirectPath);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [wait, router, redirectPath]);

  const handleSignInWithGoogle = async () => {
    setWait(true);
    await signIn("google", { callbackUrl: "/guestbook/new" });
  };

  if (status == "loading" || wait)
    return (
      <div className="w-full flex justify-center items-center flex-col h-screen">
        <header className="text-center">
          <h1 className="text-xl lg:text-3xl font-semibold text-primary">Authenticating...</h1>
          <p className="text-lg mt-5">Please Wait Before Redirecting</p>
        </header>
        <Lottie animationData={fingerPrintSuccess} loop={false} className="w-1/2 lg:w-1/3" />
      </div>
    );

  if (status == "unauthenticated")
    return (
      <div className="w-full flex justify-center items-center flex-col h-screen">
        <header className="text-center">
          <h1 className="text-xl lg:text-3xl font-semibold text-primary">Unauthorized!</h1>
          <p className="text-lg mt-5">Sign In Before Continuing</p>
        </header>
        <Lottie animationData={fingerPrintFail} loop={false} className="w-1/2 lg:w-1/3" />
        <button className="btn" onClick={handleSignInWithGoogle}>
          <FcGoogle className="text-xl" /> Continue With Google
        </button>
      </div>
    );

  return <>{children}</>;
};

export default Authorization;
