import alfred, {OutputItem} from "@alfred-workflows/core";
import {jenkins} from "./jenkins";

let oddEven = false;
// alfy.cache.set('@alfred-workflows/jenkins/odd-even', !oddEven);
const lock = alfred.input.startsWith('!') || alfred.input.endsWith('!');
let jobItems: OutputItem[];
jenkins.getInfo('jobs[name,color,description,inQueue,builds[number,building,executor[*]]{0}]').then(info => {
    jobItems = info.jobs!.map((job) => ({
        title: `${job.name}${job.inQueue ? '[0%]' : ''}${job.builds![0]?.building ? ('[' + job.builds![0].executor!.progress + '%]') : ''}`,
        subtitle: job.description,
        icon: {
            path: `images/${(job.builds![0]?.building && oddEven && !lock) ? 'empty' : job.color}.png`
        },
        text: {
            copy: `${job.name}`,
            largetype: `${job.name}`
        },
        quicklookurl: `${jenkins.url}/job/${job.name}`,
        arg: `${jenkins.url}/job/${job.name}`,
        mods: {
            cmd: {
                subtitle: `${job.builds![0]?.building ? 'Cancel Build' : 'Build'} ${job.name}`,
                arg: job.name,
            }
        }
    }));
    const openItem = {
        title: 'Open Jenkins URL',
        arg: jenkins.url
    };
    let input = alfred.input?.toLowerCase() || '';
    if (lock) {
        if (input.startsWith('!')) {
            input = input.substring(1);
        }
        if (input.endsWith('!')) {
            input = input.slice(0, -1);
        }
    }
    alfred.output({items: [openItem, ...jobItems]}, ['title'])
})
