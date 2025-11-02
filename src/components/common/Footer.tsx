import { ReactNode } from 'react';

function Footer(props: { children?: ReactNode }) {
    return (
        <footer className='bg-[#477023] text-background p-2 text-center'>
            <div>SNAPMEAL © 2024</div>
            {props.children && <div>{props.children}</div>}
        </footer>
    );
};

export default Footer;