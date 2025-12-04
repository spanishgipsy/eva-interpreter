``` bash
# install vite + react + ts
npm create vite@latest packages/eva-web -- --template react-ts
cd packages/eva-web
# add testing libraries for teact + dom
npm install -D @testing-library/react @testing-library/jest-dom jsdom
# update vite config with tests
cat <<EOF > vite.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
});
EOF
# add test setup
echo "import '@testing-library/jest-dom'" >> ./src/setupTests.ts

```
