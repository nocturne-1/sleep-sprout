import React, { useState } from 'react';
import { auth } from "../configuration";
import { signInWithEmailAndPassword } from 'firebase/auth';

const userAuthContext = createContext();

export function useUserAuth() {
    return UseContext(userAuthContext);
}
