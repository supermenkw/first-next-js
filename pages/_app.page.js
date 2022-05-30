import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import '../styles/style.css'
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/sections/layout'

function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
