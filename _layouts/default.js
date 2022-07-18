import Head from 'next/head'
import Header from '@includes/header'
import 'tailwindcss/tailwind.css'

export default function DefaultLayout(props) {
  // console.log(props)
  return (
    <main className="py-6">
        <Head>
            <title>{props.title}</title>
            <meta name='description' content="A place for freelancers to offer their services."/>
            <meta property="og:title" content="DevSeek"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content=""/>
            <meta property="og:description" content="A place for freelancers to offer their services."/>
            <meta name="theme-color" content="#6ee7b7"/>
        </Head>
        <Header props={props.user}/>
        {props.children}
    </main>
  )
}