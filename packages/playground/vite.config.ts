import { loadEnv, searchForWorkspaceRoot, ConfigEnv, UserConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return {
    base: env.VITE_BASE_URL,
    define: {
      'process.env.BASE_URL': JSON.stringify(env.VITE_BASE_URL)
    },
    plugins: [vue(), vueJsx()],
    server: {
      fs: {
        allow: [
          // search up for workspace root
          searchForWorkspaceRoot(process.cwd())
        ]
      },
      proxy: {
        '/api': {
          target: 'http://11.11.160.192:48810',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
      }
    }
  }
}
