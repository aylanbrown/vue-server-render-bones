import { createApp } from './main'


export default context => {
	return new Promise((resolve, reject) => {
		const { app, router, store } = createApp()

		router.push(context.url)

		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents()
			if( !matchedComponents.length ) {
				return reject({ code: 404 })
			}

			Promise.all(matchedComponents.map(Componet => {
				if(Componet.asyncData) {
					return Componet.asyncData({
						store,
						route: router.currentRoute,
						req: context.header
					})
				}
			})).then(() => {
				context.state = store.state
				resolve(app)
			}).catch(reject)

		}, reject)
	})
}