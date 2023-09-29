import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Main from './prog_parse_tags/Main'
import App from './_app'
import React from 'react'
import { ReactDOM } from 'react'
import SectionImage from './prog_parse_tags/blog_for_image/SectionImage'
import CreateIssue from './prog_parse_tags/create_issue/CreateIssue'
import CreateTestCase from './prog_parse_tags/create_test_case/CreateTestCase'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main/>
      <SectionImage/>
      <CreateIssue/>
      <CreateTestCase/>
      
      
    </>
  )
}