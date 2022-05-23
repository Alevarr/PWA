window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('sw.js')
      console.log('Service worker register success', reg)
    } catch (e) {
      console.log('Service worker register fail')
    }
  }

  // await loadPosts()
})


async function loadPosts() {
  let fetch1 = new Fetch("http://localhost:8080/text.txt").request("text");

  // const container = document.querySelector('#posts')
  // container.innerHTML = data.map(toCard).join('\n')
}

// function toCard(post) {
//   return `
//     <div class="card">
//       <div class="card-title">
//         ${post.title}
//       </div>
//       <div class="card-body">
//         ${post.body}
//       </div>
//     </div>
//   `
// }
