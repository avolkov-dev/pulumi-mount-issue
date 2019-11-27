# Pulumi attach volume issue

## Steps to reproduce


 - Set up the aws-access-key and aws-secret-access-key for your aws provided
 
- run 
```console
npm install
```

- run 

```console
pulumi up
```

- change userData prop in index.ts.

 run 

```console
pulumi up
```

Expected: ec2 instance recreated and data-volume reattached to new instance


Actual: getting  "VolumeInUse" error
```console
error: Error attaching volume (vol-xxx) to instance (i-xxx), message: "vol-xxx is already attached to an instance", code: "VolumeInUse"
```


Fixed with deleteBeforeReplace: true on ec2 instance
