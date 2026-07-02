/* ============================================================
   MBA PARTNER — SHARED CLIENT AUTH  (prototype)
   ------------------------------------------------------------
   Demo-mode accounts live in the browser (localStorage). This is
   fine for the finals demo; for production the SAME functions
   (signup / login / logout) get repointed at a real backend
   (Wix Members / Netlify function) — the rest of the site doesn't
   change.

   Session keys (shared with nav-auth.js & form.js):
     mbaPartnerSession  — logged-in email
     mbaPartnerName     — display name
     mbaPartnerAvatar   — single-letter avatar
   Accounts store:  mbaAccounts  (JSON array)
   Post-login return URL (e.g. back to the cart): mbaReturnTo (sessionStorage)
============================================================ */
(function (global) {
  'use strict';
  var SESSION = 'mbaPartnerSession', NAME = 'mbaPartnerName',
      AVATAR = 'mbaPartnerAvatar', ACCTS = 'mbaAccounts', RET = 'mbaReturnTo';

  function L() { try { return window.localStorage; } catch (e) { return null; } }
  function S() { try { return window.sessionStorage; } catch (e) { return null; } }

  function getAccounts() { try { return JSON.parse((L() && L().getItem(ACCTS)) || '[]'); } catch (e) { return []; } }
  function saveAccounts(a) { try { L().setItem(ACCTS, JSON.stringify(a)); } catch (e) {} }

  function isLoggedIn()   { try { return !!L().getItem(SESSION); } catch (e) { return false; } }
  function currentEmail() { try { return L().getItem(SESSION) || ''; } catch (e) { return ''; } }
  function currentName()  { try { return L().getItem(NAME) || ''; } catch (e) { return ''; } }

  function setSession(email, name) {
    var l = L(); if (!l) return;
    l.setItem(SESSION, email);
    if (name) { l.setItem(NAME, name); l.setItem(AVATAR, (name[0] || email[0] || '?').toUpperCase()); }
  }
  function logout() { var l = L(); if (l) { l.removeItem(SESSION); l.removeItem(NAME); l.removeItem(AVATAR); } }

  function emailValid(e) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e); }
  function norm(e) { return (e || '').trim().toLowerCase(); }

  function signup(name, email, password) {
    name = (name || '').trim(); email = norm(email); password = password || '';
    if (!name) return { ok: false, error: 'Please enter your name.' };
    if (!emailValid(email)) return { ok: false, error: 'Please enter a valid email.' };
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    var a = getAccounts();
    if (a.some(function (x) { return x.email === email; }))
      return { ok: false, error: 'An account with this email already exists — please log in.' };
    a.push({ email: email, password: password, name: name, courses: [] });
    saveAccounts(a);
    setSession(email, name);
    return { ok: true };
  }

  function login(email, password) {
    email = norm(email); password = password || '';
    var u = getAccounts().find(function (x) { return x.email === email && x.password === password; });
    if (u) { setSession(email, u.name); return { ok: true }; }
    return { ok: false, error: 'No matching account. Check your details or sign up.' };
  }

  function findAccount(email) {
    email = norm(email);
    return getAccounts().find(function (x) { return x.email === email; }) || null;
  }

  /* Add bought courses to the logged-in account. courses: [{id,title,type,emoji}] */
  function addPurchasedCourses(courses) {
    var email = currentEmail(); if (!email) return;
    var a = getAccounts(); var u = a.find(function (x) { return x.email === email; });
    if (!u) return;
    u.courses = u.courses || [];
    (courses || []).forEach(function (c) {
      if (!u.courses.some(function (x) { return x.id === c.id; }))
        u.courses.push({ id: c.id, title: c.title, type: c.type, emoji: c.emoji || '📘' });
    });
    saveAccounts(a);
  }

  function setReturn(url) { var s = S(); if (s) s.setItem(RET, url || ''); }
  function takeReturn() { var s = S(); if (!s) return ''; var v = s.getItem(RET) || ''; s.removeItem(RET); return v; }

  global.MBAauth = {
    isLoggedIn: isLoggedIn, currentEmail: currentEmail, currentName: currentName,
    signup: signup, login: login, logout: logout, findAccount: findAccount,
    addPurchasedCourses: addPurchasedCourses, setSession: setSession,
    setReturn: setReturn, takeReturn: takeReturn, getAccounts: getAccounts
  };
})(typeof window !== 'undefined' ? window : globalThis);

if (typeof module !== 'undefined') module.exports = (typeof window !== 'undefined' ? window : globalThis).MBAauth;
