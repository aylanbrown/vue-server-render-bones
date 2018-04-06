const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const  { createBundleRenderer } = require('vue-server-renderer')



const app = new Koa()
const resolve = opt => path.resolve(__dirname, opt)


const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
	runInNewContext: false,
	template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
	clientManifest: require('./dist/vue-ssr-client-manifest.json')
})


function renderToString(context) {
	return new Promise((resolve, reject) => {
		renderer.renderToString(context, (err, html) => {
			err ? reject(err) : resolve(html)
		})
	})
}


app.use(require('koa-static')(resolve('./dist')))

app.use(async (ctx, next) => {
	try {
		const context = {
			title: 'demo',
			url: ctx.url,
			header: ctx.request.header
		}

		ctx.body = await renderToString(context)

		ctx.set('Content-Type', 'text/html')
		ctx.set('Server', 'Koa2')
	} catch(e) {
		next()
	}
})


app.listen(3000)
