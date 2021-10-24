import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

function SignIn({ providers }) {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center'>
        <img className='w-80' src='https://links.papareact.com/ocw' alt='' />
        <p className='font-xs italic'>Only for educational purposes only</p>
        <div className='mt-20'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className='p-3 flex items-center bg-white shadow-xl rounded-lg  text-blue-500'
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                <img
                  src='/google.png'
                  alt='google logo'
                  width={30}
                  className='mr-3'
                />
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default SignIn;
