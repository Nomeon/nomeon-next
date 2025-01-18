import { ProjectCardProps, ProjectCard } from '@/components/custom/project-card'

const projects: ProjectCardProps[] = [
    {
        name: 'IFC converter',
        company: 'geWOONhout',
        description: 'A tool to convert IFC files to 3D models',
        image: '/project-images/ifc-converter.png'
    },
    {
        name: 'Coentainer',
        company: 'Nijhuis Rioolreiniging',
        description: 'A tool to track the location of containers',
        image: '/project-images/coentainer.png'
    },
    {
        name: 'IBIS Trad connector',
        company: 'Koopmans Bouwgroep',
        description: 'A tool to connect IBIS Trad to an ERP system',
        image: '/project-images/padchecker.png'
    },
    {
        name: 'Padchecker',
        company: 'geWOONhout',
        description: 'A tool to check whether a specific file exists',
        image: '/project-images/padchecker.png'
    },
    {
        name: 'Website',
        company: 'Vosteq',
        description: 'A website for Vosteq',
        image: '/project-images/vosteq.png'
    },
    {
        name: 'Website',
        company: 'Elan Interim Advies',
        description: 'A website for Elan Interim Advies',
        image: '/project-images/elan.png'
    }
]


export default function Projects() {
    return (
        <div className="h-full w-full flex items-center justify-center p-8">
            <div className="grid-cols-3 grid p-16 gap-16">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </div>
    )
}