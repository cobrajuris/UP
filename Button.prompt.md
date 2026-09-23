The primary action control — always a full pill, never a rounded rectangle.

```jsx
<Button variant="primary" size="lg" block>Começar treino</Button>
<Button variant="secondary" iconStart="arrow-left">Anterior</Button>
<Button variant="primary" iconEnd="arrow-right">Próximo</Button>
<Button disabled>Agendar sessão</Button>
```

One lime button per screen. Paired wizard navigation puts `secondary` on the left and `primary` on the right. Disabled renders as flat mid-grey (#656566) with dark text, matching the kit.