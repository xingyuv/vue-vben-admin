import type { UserConfig, ConfigEnv } from 'vite'
import pkg from './package.json'
import dayjs from 'dayjs'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { generateModifyVars } from './build/generate/generateModifyVars'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { OUTPUT_DIR } from './build/constant'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // loadEnv 读取的布尔类型是一个字符串。 该函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        },
        // @/xxxx => src/xxxx
        {
          find: /\@\//,
          replacement: pathResolve('src') + '/'
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    server: {
      // 是否开启https
      https: false,
      // 监听所有本地 IP
      host: true,
      port: VITE_PORT,
      // 从 .env 加载代理配置
      proxy: createProxy(VITE_PROXY)
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // 关闭 brotliSize 显示可以稍微减少打包时间
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000
    },
    define: {
      // vite-plugin-theme
      __COLOR_PLUGIN_OUTPUT_FILE_NAME__: undefined,
      __PROD__: true,
      __COLOR_PLUGIN_OPTIONS__: {},
      // setting vue-i18-next
      // 拦截警告
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },

    // 项目使用的vite插件。 量大，单独提取管理
    plugins: createVitePlugins(viteEnv, isBuild),

    optimizeDeps: {
      // @iconify/iconify: 依赖是由@purge-icons/generated 动态和虚拟加载的，所以需要指定
      include: [
        'vue',
        'less',
        'vue-i18n',
        'vue-router',
        'vue-types',
        'qs',
        'dayjs',
        'axios',
        'pinia',
        'crypto-js',
        'nprogress',
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        '@vue/runtime-core',
        '@iconify/iconify',
        'ant-design-vue/es/style',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US'
      ]
    }
  }
}
