import { Button, Frog, TextInput } from 'frog'
import * as hubs from 'frog/hubs'
import { createCanvas } from 'canvas'

import { app as middlewareApp } from './middleware.js'
import { app as neynarApp } from './neynar.js'
import { app as routingApp } from './routing.js'
import { app as todoApp } from './todos.js'
import { app as transactionApp } from './transaction.js'

export const app = new Frog({
  browserLocation: '/:path/dev',
  hub: hubs.frog(),
  verify: false,
})

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    action: '/action',
    image: (
      <div
        tw="flex"
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Welcome :)'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter custom fruit" />,
      <Button value="apples">Apples</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.frame('/base-64', (c) => {
  const { status } = c
  return c.res({
    action: '/action',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
    intents: [
      <TextInput placeholder="Enter custom fruit" />,
      <Button value="apples">Apples</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.frame('/base-64/canvas', (c) => {
  const { status } = c
  const canvas = createCanvas(200, 200)
  const ctx = canvas.getContext('2d')
  // Write "Awesome!"
  ctx.font = '30px Impact'
  ctx.rotate(0.1)
  ctx.fillText('Awesome!', 0, 100)

  return c.res({
    action: '/action',
    image: canvas.toDataURL('image/png'),
    intents: [
      <TextInput placeholder="Enter custom fruit" />,
      <Button value="apples">Apples</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.frame('/action', (c) => {
  const { buttonValue, inputText } = c
  const fruit = inputText || buttonValue || ''
  return c.res({
    action: '/',
    image: (
      <div
        style={{
          backgroundColor: '#1E1E4C',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 60,
          width: '100%',
          height: '100%',
        }}
      >
        Yuck! {fruit}! Enter another one.
      </div>
    ),
    intents: [
      <Button value="watermelon">Watermelon</Button>,
      <Button value="mango">Mango</Button>,
      <Button value="pear">Pear</Button>,
      <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.frame('/buttons', (c) => {
  const { buttonValue } = c
  return c.res({
    image: (
      <div
        style={{
          backgroundColor: '#2D2D2D',
          display: 'flex',
          fontSize: 60,
          width: '100%',
          height: '100%',
        }}
      >
        {buttonValue ?? ''}
      </div>
    ),
    intents: [
      <Button.Redirect location="http://github.com/honojs/vite-plugins/tree/main/packages/dev-server">
        Redirect
      </Button.Redirect>,
      <Button.Link href="https://www.example.com">Link</Button.Link>,
      <Button.Mint target="eip155:7777777:0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df">
        Mint
      </Button.Mint>,
      <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.frame('/no-intents', (c) => {
  return c.res({
    image: (
      <div style={{ backgroundColor: 'green', width: '100%', height: '100%' }}>
        foo
      </div>
    ),
    imageAspectRatio: '1:1',
  })
})

app.frame('/falsy-intents', (c) => {
  return c.res({
    image: (
      <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>
        foo
      </div>
    ),
    intents: [
      null,
      undefined,
      false,
      <Button>Apples</Button>,
      false && <Button>Oranges</Button>,
    ],
  })
})

app.frame('/mint', (c) => {
  return c.res({
    image: 'https://basepaint.xyz/api/art/image?day=191',
    imageAspectRatio: '1:1',
    intents: [
      <Button.Mint target="eip155:7777777:0xba5e05cb26b78eda3a2f8e3b3814726305dcac83:191">
        Mint
      </Button.Mint>,
    ],
  })
})

app.frame('/button-action', (c) => {
  const { buttonValue } = c
  return c.res({
    image: (
      <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>
        {buttonValue ?? 'foo'}
      </div>
    ),
    intents: [
      <Button action="/" value="hello again">
        Fruits
      </Button>,
      <Button action="/button-action-2" value="next">
        Next
      </Button>,
      <Button action="/image-only" value="cheese">
        Image only
      </Button>,
    ],
  })
})

app.frame('/button-action-2', (c) => {
  const { buttonValue } = c
  return c.res({
    image: (
      <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>
        {buttonValue ?? 'foo'}
      </div>
    ),
    intents: [
      <Button action="/button-action" value="back">
        Back
      </Button>,
    ],
  })
})

app.frame('/image-only', (c) => {
  return c.res({
    image: (
      <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>
        foo
      </div>
    ),
  })
})

app.frame('/redirect-buttons', (c) => {
  return c.res({
    image: <div tw="flex">foo</div>,
    intents: [
      <Button.Redirect location={`https://example.com/${c.frameData?.fid}`}>
        FID
      </Button.Redirect>,
      <Button.Redirect
        location={`https://example.com/${c.frameData?.castId?.fid}`}
      >
        Cast ID
      </Button.Redirect>,
      <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.route('/middleware', middlewareApp)
app.route('/neynar', neynarApp)
app.route('/routing', routingApp)
app.route('/transaction', transactionApp)
app.route('/todos', todoApp)
