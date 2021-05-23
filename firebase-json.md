# Good to know about this JSON file

## Apparently random 404s

The index.js specifies the use of the history mode, so you need to tell the Firebase deploy to properly set up
redirects. Otherwise, you will find that browser refreshes, and some anchor tags will throw a 404 at you, even though
the / route appears fine. See https://auth.google.com/docs/hosting/full-config#rewrite-functions, but the basic thing is
to:

* Add to hosting > rewrites an object like this

```
{
    "source": "**",
    "destination": "/index.html"
}
```

* The rewrites section is an array, so you can create custom / special rewrites if you want. I expect that the main use
  for this is if you want to cause a URL to invoke a Firebase Function (like an API?)
* This following was part of an example file, but is not necessary to fix the 404 problem.

```
,
      {
        "source": "**",
        "function": "app"
      }
```

## Caching

Add to the hosting > headers array. Ech entry start with a regexp to match (usually) certain types of content, and is
then followed by a list of key:value pairs
