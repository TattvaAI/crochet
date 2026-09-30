// Verifies the "Commission by" math independently of React.
const DAY = 86400000;
const tiers = [
  { id:'atelier',  name:'Atelier',  days:98 },
  { id:'heritage', name:'Heritage', days:42 },
  { id:'gift',     name:'Ready',    days:3  },
];
const today = new Date(); today.setHours(0,0,0,0);

function check(deliveryStr) {
  const delivery = new Date(`${deliveryStr}T00:00:00`);
  console.log(`\nDelivery: ${deliveryStr}`);
  for (const t of tiers) {
    const last = new Date(delivery.getTime() - (t.days + 3) * DAY);
    const diff = Math.round((last - today) / DAY);
    const status = diff < 0 ? 'CLOSED' : diff <= 21 ? 'TIGHT' : 'OPEN';
    const shown = last.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
    console.log(`  ${t.name.padEnd(9)} last=${shown.padEnd(20)} ${String(diff).padStart(5)}d  ${status}`);
  }
}
// Far future: everything open
check('2027-12-25');
// Medium: gift closed, heritage tight
check(new Date(today.getTime() + 70*DAY).toISOString().slice(0,10));
// Near: only ready gift viable
check(new Date(today.getTime() + 12*DAY).toISOString().slice(0,10));
// Past: all closed
check('2024-01-01');
