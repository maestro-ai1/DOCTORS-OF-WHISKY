(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  var BASE = 'https://doctorsofwhisky.com.au';

  navigator.modelContext.provideContext({
    tools: [
      {
        name: 'browse_products',
        description: 'Browse whisky, spirits, wine and beer by category (whisky, spirit, beer-premix-wine, other)',
        inputSchema: {
          type: 'object',
          properties: { category: { type: 'string', description: 'Category slug to browse' } }
        },
        execute: async function (args) {
          var category = args && args.category;
          var url = category ? BASE + '/shop/' + encodeURIComponent(category) + '/' : BASE + '/shop/';
          window.location.href = url;
          return { url: url };
        }
      },
      {
        name: 'search_products',
        description: 'Search the catalogue by keyword or brand, for example "macallan 18" or "japanese whisky"',
        inputSchema: {
          type: 'object',
          required: ['query'],
          properties: { query: { type: 'string', description: 'Search keywords' } }
        },
        execute: async function (args) {
          var url = BASE + '/search/?q=' + encodeURIComponent((args && args.query) || '');
          window.location.href = url;
          return { url: url };
        }
      },
      {
        name: 'order_via_whatsapp',
        description: 'Start a WhatsApp order with the concierge team. Minimum order $300 AUD. A person confirms every order.',
        inputSchema: {
          type: 'object',
          properties: { message: { type: 'string', description: 'Pre-filled order message' } }
        },
        execute: async function (args) {
          var message = args && args.message;
          var url = 'https://wa.me/61420128746' + (message ? '?text=' + encodeURIComponent(message) : '');
          window.open(url, '_blank', 'noopener');
          return { url: url };
        }
      },
      {
        name: 'read_faq',
        description: 'Open the FAQ: delivery, payment methods, authenticity and returns',
        inputSchema: { type: 'object', properties: {} },
        execute: async function () {
          window.location.href = BASE + '/faq/';
          return { url: BASE + '/faq/' };
        }
      },
      {
        name: 'contact',
        description: 'Contact Doctors of Whisky for product questions or support',
        inputSchema: { type: 'object', properties: {} },
        execute: async function () {
          window.location.href = BASE + '/contact/';
          return { url: BASE + '/contact/' };
        }
      }
    ]
  });
})();
