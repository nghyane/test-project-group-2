import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
    <footer className="bg-muted text-muted-foreground py-4 px-6 flex items-center justify-between">
        <p className="text-sm">© 2024 Intern Q&A. All rights reserved.</p>
        <div className="flex items-center gap-4">
            <Link to="#" className="text-sm hover:underline underline-offset-4">
                Contact
            </Link>
            <Link to="#" className="text-sm hover:underline underline-offset-4">
                Privacy
            </Link>
            <Link to="#" className="text-sm hover:underline underline-offset-4">
                Terms
            </Link>
        </div>
    </footer>
);

export default Footer;