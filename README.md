# Diário de Bordo (PWA)

Aplicativo web progressivo (PWA) para registrar entradas de diário com título, conteúdo e data. Os dados ficam salvos no próprio navegador, o app funciona **offline** e pode ser **instalado** no celular ou no computador.

## Deploy

```bash
```

## Funcionalidades

- Criar entradas com título, conteúdo e data.
- Listar e excluir entradas.
- Persistência com `localStorage` (as entradas continuam ao recarregar a página).
- Funcionamento offline com Service Worker.
- Instalável, com botão "Instalar App" e `manifest.json`.
- Layout responsivo.

## Tecnologias

- HTML5
- CSS3
- JavaScript (puro, sem frameworks)
- Web Storage API (`localStorage`)
- Service Worker + Cache API
- Web App Manifest

## Como rodar localmente

O Service Worker **não funciona abrindo o `index.html` direto** (`file://`). É preciso servir os arquivos por `http://localhost`.

Com Node.js:

```bash
npx serve .
```

Ou use a extensão **Live Server** do VS Code. Depois, abra o endereço indicado no navegador.

## Como testar o PWA

1. Abra o app e, no DevTools (F12), vá em **Application → Service Workers** e confira se está ativo.
2. Em **Application → Manifest**, verifique se o manifest e os ícones foram reconhecidos.
3. Marque **Offline** na aba Network (ou desligue a internet) e recarregue: o app deve continuar abrindo.
4. Clique em **Instalar App** (ou no ícone de instalação da barra de endereço) para instalar.

## Decisões do projeto

- **Segurança:** as entradas são renderizadas com `document.createElement()` e `textContent`, evitando injeção de HTML (XSS) pelo que o usuário digita.
- **Caminhos relativos** (`./`) no manifest e no Service Worker, para o app funcionar mesmo publicado em uma subpasta (como no GitHub Pages).
- **Cache completo:** HTML, CSS, JS, manifest e ícones são guardados na instalação do Service Worker.
- **Versionamento do cache:** o evento `activate` apaga caches antigos. Ao alterar qualquer arquivo do app, aumente a versão em `CACHE_NAME` (ex.: `diario-cache-v3`) para os usuários receberem a atualização.
- **Eventos sem `onclick` inline:** os botões de exclusão usam `addEventListener`.

## Autor

Leonardo Pacheco Vitorino · [GitHub](https://github.com/leonardogondor-debug) · [LinkedIn](https://www.linkedin.com/in/leonardo-pacheco-vitorino-01b0052a2/)