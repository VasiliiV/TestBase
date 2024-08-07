import React from 'react';
import './style.css'
import './prog_parse_tags/blog_for_image/SectionImage.css'
import './prog_parse_tags/create_issue/CreateIssue.css'
import './prog_parse_tags/create_test_case/CreateTestCase.css'
import './prog_parse_tags/auth/AuthUser.css'
import './prog_parse_tags/exam/Exam.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}
