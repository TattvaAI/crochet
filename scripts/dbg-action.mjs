/** Calls the Server Action's underlying logic to confirm it returns correct state. */
import { enquiryAction } from '../src/app/actions.ts';

const fd = (o) => { const f = new FormData(); for (const [k,v] of Object.entries(o)) f.append(k,v); return f; };

const empty = await enquiryAction({status:'idle'}, fd({name:'',email:'',tier:'heritage',date:'',budget:'',message:'',recipient:'',company:''}));
console.log('empty submit  ->', JSON.stringify(empty));

const badEmail = await enquiryAction({status:'idle'}, fd({name:'Priya',email:'nope',tier:'heritage',date:'',budget:'',message:'',recipient:'',company:''}));
console.log('bad email     ->', JSON.stringify(badEmail));

const good = await enquiryAction({status:'idle'}, fd({name:'Priya Sharma',email:'priya@example.com',recipient:'Mother',tier:'heritage',date:'2027-06-14',budget:'18000',message:'For a sofa.',company:''}));
console.log('valid submit  ->', JSON.stringify(good));

const bot = await enquiryAction({status:'idle'}, fd({name:'Bot',email:'bot@x.com',tier:'gift',date:'',budget:'',message:'',recipient:'',company:'AcmeCorp'}));
console.log('honeypot      ->', JSON.stringify(bot));
