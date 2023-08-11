function photographerTemplate(data) {
    const {id, name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const imgLink = document.createElement('a');
        imgLink.href = `photographer.html?id=${id}`;
        imgLink.innerHTML = `<img src="${portrait}" alt="${name}" />`;
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute('aria-label', name);
        const h3 = document.createElement('h3');
        h3.textContent = city+', '+country;
        const taglineElement = document.createElement('p');
        taglineElement.setAttribute('id', 'tagline');
        taglineElement.textContent = tagline;
        const priceElement = document.createElement('p');
        priceElement.setAttribute('id', 'price');
        priceElement.textContent = price+' €/jour';

        article.appendChild(imgLink);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return (article);
    }
    return { id, name, city, country, tagline, price, picture, getUserCardDOM }
}

function photographerHeaderTemplate(data) {
    const {id, name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserHeaderDOM() {
        const article = document.createElement( 'article' );
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute('aria-label', name);
        h2.setAttribute('id', 'photographerHeaderName');
        const h3 = document.createElement('h3');
        h3.textContent = city+', '+country;
        h3.setAttribute('id', 'photographerHeaderh3');
        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;
        taglineElement.setAttribute('id', 'photographerHeaderTagline');
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        //taglineElement.setAttribute('id', 'photographerHeaderTagline');
        //const priceElement = document.createElement('p');
        //priceElement.setAttribute('id', 'price');
        //priceElement.textContent = price+' €/jour';


        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(taglineElement);
        article.appendChild(img);
        //article.appendChild(priceElement);

        return (article);
    }
    return { id, name, city, country, tagline, price, picture, getUserHeaderDOM }
}

/* function photographerGalleryTemplate(data) {
    const { } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserHeaderDOM() {
        const article = document.createElement( 'article' );
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute('aria-label', name);
        h2.setAttribute('id', 'photographerHeaderName');
        const h3 = document.createElement('h3');
        h3.textContent = city+', '+country;
        h3.setAttribute('id', 'photographerHeaderh3');
        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;
        taglineElement.setAttribute('id', 'photographerHeaderTagline');
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        //taglineElement.setAttribute('id', 'photographerHeaderTagline');
        //const priceElement = document.createElement('p');
        //priceElement.setAttribute('id', 'price');
        //priceElement.textContent = price+' €/jour';


        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(taglineElement);
        article.appendChild(img);
        //article.appendChild(priceElement);

        return (article);
    }
    return { id, name, city, country, tagline, price, picture, getUserHeaderDOM }
}
*/