import CodeGenerators from './codeGenerators'
import { BeautifyFormatter } from './codeFormatters/formatters';
import type { CodeGenerator } from './codeGenerators/BaseCodeGenerator'
import type { Layer } from '@/types'

export type GeneratorType = keyof typeof CodeGenerators;

export const generators: Record<string, CodeGenerator> = {}

for (const t in CodeGenerators) {
  const type = t as GeneratorType
  const generator = new CodeGenerators[type]()
  const name = CodeGenerators[type].name
  generators[name] = generator
}

type GeneratorSource = HTMLElement | string | Layer[] | Layer | null

export  async function useCodeGenerator (source: GeneratorSource, type: string, ...args: any[]) {

  const generator = await Object.values(generators).find(gen => gen.name === type);
  await generator?.generate(source, ...args);
  await generator?.format(generator.code.value);

  return {
    generator
  }
}