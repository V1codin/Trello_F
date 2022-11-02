import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { auth } from '../../api/auth.api';
import { Process } from '../../modules/process';
import { useHistory } from 'react-router-dom';

function GoogleLogin(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoader, setIsLoader] = useState(true);

  const code = new URLSearchParams(props.location.search).get('code');

  useEffect(() => {
    const initLoginWithGoogle = async () => {
      try {
        const result = await auth.login(
          {
            strategy: 'google',
            code,
          },
          dispatch,
        );
        if (result.user._id) {
        }
      } catch (e) {
        console.log('login with google error', e);
      } finally {
        setIsLoader(() => false);
        history.push('/profile');
      }
    };

    initLoginWithGoogle();

    return () => setIsLoader(() => false);
  });
  return (
    <>
      <Process isShown={isLoader} styles={{ margin: '10% auto' }} />
    </>
  );
}

export { GoogleLogin };
