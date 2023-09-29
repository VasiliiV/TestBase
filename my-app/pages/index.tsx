import Head from 'next/head';
import AuthUser from './prog_parse_tags/auth/AuthUser.jsx'
import Link from 'next/link';


export default function AuthUserPage() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthUser />
    </>
  );
}