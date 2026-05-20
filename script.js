
const catalogGrid=document.getElementById('catalogGrid');
const detailsPanel=document.getElementById('detailsPanel');
const searchBar=document.getElementById('searchBar');

let currentGallery=[];
let currentIndex=0;
let currentUnit=null;

function renderUnits(data){
catalogGrid.innerHTML='';
data.forEach(unit=>{
const badgeClass=unit.category==='mid'?'badge mid':unit.category==='graffiti'?'badge graffiti':'badge';
const card=document.createElement('div');
card.className='card';
card.innerHTML=`
<img src="${unit.gallery[0]}">
<div class="card-content">
<span class="${badgeClass}">${unit.category.toUpperCase()}</span>
<h2>${unit.name}</h2>
<p>${unit.description}</p>
<div class="stats">
<div>${unit.fps}</div>
<div>${unit.battery}</div>
</div>
</div>`;
card.addEventListener('click',()=>showDetails(unit));
catalogGrid.appendChild(card);
});
}

function showDetails(unit){
currentGallery=unit.gallery;
currentIndex=0;
currentUnit=unit;
updateDetails();
}

function updateDetails(){
detailsPanel.innerHTML=`
<div class="slider">
<button class="arrow left" onclick="prevImage()">❮</button>
<img src="${currentGallery[currentIndex]}" id="sliderImage">
<button class="arrow right" onclick="nextImage()">❯</button>
</div>

<button class="zoom-btn" onclick="zoomImage()">ZOOM IMAGE</button>

<h2>${currentUnit.name}</h2>
<p>${currentUnit.description}</p>

<div class="stats">
<div>${currentUnit.fps}</div>
<div>${currentUnit.battery}</div>
</div>

<div class="features">
<h3 style="margin:25px 0 15px;color:#ffb100;">FEATURES</h3>
<ul>
${currentUnit.features.map(f=>`<li>${f}</li>`).join('')}
</ul>
</div>

<div class="freebies">
<h3 style="margin:25px 0 15px;color:#ffb100;">FREEBIES</h3>
<ul>
${currentUnit.freebies.map(f=>`<li>${f}</li>`).join('')}
</ul>
</div>
`;
}

function prevImage(){
currentIndex=(currentIndex-1+currentGallery.length)%currentGallery.length;
updateDetails();
}

function nextImage(){
currentIndex=(currentIndex+1)%currentGallery.length;
updateDetails();
}

function zoomImage(){
document.getElementById('zoomModal').style.display='flex';
document.getElementById('zoomedImage').src=currentGallery[currentIndex];
}

function closeZoom(){
document.getElementById('zoomModal').style.display='none';
}

function filterUnits(category){
if(category==='all'){renderUnits(units);return;}
renderUnits(units.filter(u=>u.category===category));
}

searchBar.addEventListener('keyup',()=>{
const val=searchBar.value.toLowerCase();
renderUnits(units.filter(u=>u.name.toLowerCase().includes(val)));
});

renderUnits(units);
