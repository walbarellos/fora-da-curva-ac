# 09. Segurança & Privacidade

Mesmo sendo uma plataforma de transparência com dados de domínio público, a segurança e a integridade da informação são requisitos de primeira ordem.

## 1. Diretriz de Exposição e Privacidade
- **Foco Institucional:** A plataforma organiza os dados prioritariamente pela cadeia:
  $$\text{Cargo} \longrightarrow \text{Órgão} \longrightarrow \text{Pagamento} \longrightarrow \text{Composição} \longrightarrow \text{Fonte}$$
- **Proteção contra DoS e Perseguição Pessoal:** Não são indexados números de CPF, fotos ou dados bancários pessoais dos servidores.
- Se o portal de origem listar nomes completos (conforme jurisprudência do STF no ARE 652.480), o sistema não faz disso o título da página ou chamariz sensacionalista de redes sociais, prevenindo abusos.

## 2. Cabeçalhos de Segurança HTTP (CSP)
A aplicação Next.js implementa cabeçalhos defensivos via `next.config.js`:
- `Content-Security-Policy`: Restringe carregamento de scripts a fontes estritas e hashes locais.
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy`: Desativa microfone, câmera e geolocalização.

## 3. Sanitização e Proteção contra Injeção
- Zero injeção de HTML não sanitizado: Todos os textos provenientes de descrições de verbas de portais externos passam por sanitização estrita para prevenir Cross-Site Scripting (XSS).
- Chaves de API, senhas de banco de dados e credenciais de pipeline nunca são expostas em código frontend.
