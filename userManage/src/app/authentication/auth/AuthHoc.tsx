import { useRouter } from 'next/navigation';
import { useEffect, useState, ComponentType } from 'react';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string;

interface WithAuthProps { }

const withAuth = <P extends WithAuthProps>(WrappedComponent: ComponentType<P>) => {
    const WithAuthComponent = (props: P) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (token) {
                fetch('/api/verifyToken/route', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.valid) {
                            setIsAuthenticated(true);
                        } else {
                            console.error('Failed to verify token');
                            localStorage.removeItem('token');
                            router.push('/authentication/login');
                        }
                    })
                    .catch(() => {
                        console.error('Failed to verify token');
                        localStorage.removeItem('token');
                        router.push('/authentication/login');
                    });
            } else {
                router.push('/authentication/login');
            }
        }, [router]);

        if (!isAuthenticated) {
            return null; // 或者显示一个加载组件
        }

        return <WrappedComponent {...props} />;
    };

    return WithAuthComponent;
};

export default withAuth;
