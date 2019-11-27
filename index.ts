import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const awsConfig = new pulumi.Config("aws");

const provider = new aws.Provider("aws-provider", {
    accessKey: awsConfig.requireSecret("aws-access-key"),
    secretKey: awsConfig.requireSecret("aws-secret-access-key"),
    region: aws.EUCentral1Region
});

const ec2 =  new aws.ec2.Instance("instance", {
    instanceType: "t2.small",
    ami : "ami-0ac05733838eabc06",
    availabilityZone: "eu-central-1a",
    userData: "", // change user-data after first run
    tags: {
        "Name":"Temp"
    }
}, { provider: provider });   

const dataVolume = new aws.ebs.Volume("data-volume", {
    availabilityZone: 'eu-central-1a',
    size: 8,
    type: "gp2"
}, { provider: provider})

new aws.ec2.VolumeAttachment( "data-attachment",
    {
      volumeId: dataVolume.id,
      instanceId: ec2.id,
      deviceName: "/dev/xvdb",
      forceDetach: true
}, { provider: provider });
