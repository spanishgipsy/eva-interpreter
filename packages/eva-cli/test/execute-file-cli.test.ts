import { test, expect } from 'vitest';
import { execa } from 'execa';

test('eva executes .eva file and prints expected output', async () => {
  // cwd = eva-cli as vitest executes tests from that directory
  const { stdout, stderr, exitCode } = await execa('eva', ['-f', 'test/fixtures/test.eva']);
  expect(exitCode).toBe(0);
  expect(stderr).toBe('');
  expect(stdout).toContain('n = 1 x = 10 y = 20 z = 30 calc = 60');
});

