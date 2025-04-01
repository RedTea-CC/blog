import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended',
    'prettier',
  ),
  // 将MDX插件配置改为对象形式
  {
    files: ['**/*.mdx'],
    extends: ['plugin:mdx/recommended'],
  },
]

export default eslintConfig
